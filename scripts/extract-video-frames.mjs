import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const TEST_RESULTS_DIR = path.resolve(process.cwd(), 'test-results');
const FRAMES_DIR = path.resolve(process.cwd(), 'docs/screenshots/phase-2/motion/frames');

if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

function findVideos(dir) {
  let videos = [];
  if (!fs.existsSync(dir)) return videos;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      videos = videos.concat(findVideos(fullPath));
    } else if (entry.name.endsWith('.webm')) {
      videos.push(fullPath);
    }
  }
  return videos;
}

const videos = findVideos(TEST_RESULTS_DIR);
console.log(`Found ${videos.length} video recording(s) in test-results.`);

if (videos.length === 0) {
  console.log('No webm videos found yet. Run Playwright tests first.');
  process.exit(0);
}

// Select the primary gallery / motion test video
const primaryVideo = videos[0];
console.log(`Extracting frames from primary video: ${primaryVideo}`);

try {
  // Extract 1 frame per second up to 10 key transition frames
  const cmd = `ffmpeg -y -i "${primaryVideo}" -vf "fps=1" -vframes 10 "${path.join(FRAMES_DIR, 'frame_%02d.png')}"`;
  execSync(cmd, { stdio: 'inherit' });
  console.log(`Successfully extracted video frames to ${FRAMES_DIR}`);

  // Create a log describing the extracted frames
  const frameFiles = fs.readdirSync(FRAMES_DIR).filter((f) => f.endsWith('.png'));
  console.log(`Extracted ${frameFiles.length} frames.`);
} catch (err) {
  console.error('Error extracting video frames:', err);
  process.exit(1);
}
