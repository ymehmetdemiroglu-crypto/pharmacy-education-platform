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
num_ideas = len(all_ideas)

# 1. Feature extraction & TF-IDF
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
    for t in set(tokens):
        df[t] += 1

vocab_words = [w for w, count in df.items() if count >= 2]
vocab = {w: idx for idx, w in enumerate(vocab_words)}
vocab_size = len(vocab)

tfidf_matrix = np.zeros((num_ideas, vocab_size), dtype=np.float32)
idf = np.log((num_ideas + 1) / (np.array([df[w] for w in vocab_words]) + 1.0)) + 1.0

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

# Test clustering with threshold
print("Testing similarity clustering...")
threshold = 0.38

# Union-Find for connected components
parent = list(range(num_ideas))
def find(i):
    if parent[i] == i:
        return i
    parent[i] = find(parent[i])
    return parent[i]

def union(i, j):
    root_i = find(i)
    root_j = find(j)
    if root_i != root_j:
        parent[root_i] = root_j

# Connect pairs with high similarity
for i in range(num_ideas):
    for j in range(i + 1, num_ideas):
        if sim_matrix[i, j] >= threshold:
            union(i, j)

clusters = defaultdict(list)
for i in range(num_ideas):
    clusters[find(i)].append(i)

print(f"At threshold {threshold}: {len(clusters)} clusters formed.")
cluster_sizes = Counter(len(c) for c in clusters.values())
print(f"Cluster size distribution: {sorted(cluster_sizes.items())}")
