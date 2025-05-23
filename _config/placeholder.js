import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isRasterImage = (filename) =>
    /\.(jpe?g|png|webp|gif)$/i.test(filename);

async function getAllRasterImages(dir) {
    let files = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files = files.concat(await getAllRasterImages(fullPath));
        } else if (entry.isFile() && isRasterImage(entry.name)) {
            files.push(fullPath);
        }
    }

    return files;
}

export default function imagePlaceholderPlugin(eleventyConfig) {
    eleventyConfig.on("afterBuild", async () => {
        const srcDir = path.join(__dirname, "../src/img");
        const outputDir = path.join(__dirname, "../_site/img");

        const files = await getAllRasterImages(srcDir);

        for (const file of files) {
            const relativePath = path.relative(srcDir, file);
            const outputPath = path.join(outputDir, relativePath);
            const outputDirname = path.dirname(outputPath);
            const ext = path.extname(relativePath);
            const baseName = path.basename(relativePath, ext);
            const placeholderName = `p-${baseName}${ext}`;
            const placeholderPath = path.join(outputDirname, placeholderName);

            // Check if placeholder already exists
            let placeholderExists = true;
            try {
                await fs.access(placeholderPath);
            } catch {
                placeholderExists = false;
            }

            if (placeholderExists) {
                // Skip if placeholder is already there
                continue;
            }

            try {
                await fs.mkdir(outputDirname, { recursive: true });
                await sharp(file).resize({ width: 20 }).toFile(placeholderPath);
                console.log(`✅ Created placeholder: ${placeholderPath}`);
            } catch (err) {
                console.error(`❌ Failed to process ${file}: ${err.message}`);
            }
        }
    });
}
