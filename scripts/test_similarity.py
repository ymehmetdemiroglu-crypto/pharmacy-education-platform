import sys
import json
import re
from collections import defaultdict, Counter
import numpy as np

sys.stdout.reconfigure(encoding='utf-8')

with open('docs/council/phase1_raw_ideas.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

all_ideas = data['all_ideas']
id_map = {i['id']: i for i in all_ideas}

stop_words = {
    'the', 'and', 'for', 'with', 'that', 'this', 'from', 'into', 'over', 'under', 'are', 'was',
    'were', 'will', 'been', 'have', 'has', 'had', 'does', 'did', 'each', 'more', 'when', 'which',
    'their', 'then', 'than', 'them', 'these', 'those', 'also', 'such', 'only', 'just', 'where',
    'after', 'before', 'between', 'during', 'through', 'about', 'above', 'below', 'down', 'while',
    'both', 'other', 'some', 'what', 'how', 'why', 'can', 'could', 'should', 'would', 'may', 'might',
    'must', 'student', 'students', 'learner', 'learners', 'learning', 'mechanism', 'effect', 'using',
    'used', 'uses', 'allow', 'allows', 'allowing', 'provide', 'provides', 'providing', 'based',
    'system', 'platform', 'course', 'courses', 'module', 'modules', 'lesson', 'lessons', 'step', 'steps'
}

def get_tokens(text):
    tokens = re.findall(r'\b[a-zA-Z0-9\-\_]{3,}\b', text.lower())
    return [t for t in tokens if t not in stop_words]

doc_tokens = []
df = Counter()
for item in all_ideas:
    title_tokens = get_tokens(item['name']) * 3
    mech_tokens = get_tokens(item['mechanism']) * 2
    eff_tokens = get_tokens(item['expected_effect'])
    tokens = title_tokens + mech_tokens + eff_tokens
    doc_tokens.append(tokens)
    unique_tokens = set(tokens)
    for t in unique_tokens:
        df[t] += 1

vocab_words = [w for w, count in df.items() if count >= 2]
vocab = {w: idx for idx, w in enumerate(vocab_words)}
vocab_size = len(vocab)
num_docs = len(all_ideas)
print(f"Vocabulary size (df >= 2): {vocab_size}")

tfidf_matrix = np.zeros((num_docs, vocab_size), dtype=np.float32)
idf = np.log((num_docs + 1) / (np.array([df[w] for w in vocab_words]) + 1.0)) + 1.0

for doc_idx, tokens in enumerate(doc_tokens):
    tf = Counter(tokens)
    for w, count in tf.items():
        if w in vocab:
            w_idx = vocab[w]
            tfidf_matrix[doc_idx, w_idx] = count * idf[w_idx]

norms = np.linalg.norm(tfidf_matrix, axis=1, keepdims=True)
norms[norms == 0] = 1.0
tfidf_norm = tfidf_matrix / norms

sim_matrix = np.dot(tfidf_norm, tfidf_norm.T)
print(f"Similarity matrix computed: shape {sim_matrix.shape}")

cross_pairs = []
for i in range(num_docs):
    seat_i = all_ideas[i]['seat_prefix']
    for j in range(i + 1, num_docs):
        seat_j = all_ideas[j]['seat_prefix']
        if seat_i != seat_j:
            sim = sim_matrix[i, j]
            if sim >= 0.40:
                cross_pairs.append((sim, all_ideas[i]['id'], all_ideas[j]['id']))

cross_pairs.sort(key=lambda x: x[0], reverse=True)
print(f"Found {len(cross_pairs)} cross-seat pairs with similarity >= 0.40")
for sim, id1, id2 in cross_pairs[:20]:
    i1 = id_map[id1]
    i2 = id_map[id2]
    print(f"Sim {sim:.3f} | [{id1}] {i1['name'][:35]} <---> [{id2}] {i2['name'][:35]}")
