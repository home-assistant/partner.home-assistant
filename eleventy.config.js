import { InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginFilters from "./_config/filters.js";
import { SHAPES } from "./_config/shapes.js";
import placeholder from "./_config/placeholder.js";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
	eleventyConfig
		.addPassthroughCopy({
			"public": "/",
			"src/img": "img",
			"src/js": "js",
			"src/svg": "svg",
		});

	eleventyConfig.addGlobalData("CACHE_KEY", btoa("" + new Date().valueOf()).replaceAll("=", ""));

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("src/scss/**/*.scss");
	eleventyConfig.addWatchTarget("src/js/**/*.js");
	eleventyConfig.addWatchTarget("src/svg/**/*");
	eleventyConfig.addWatchTarget("src/img/**/*");

	// Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
	// Adds the {% css %} paired shortcode

	// Plugins

	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(pluginFilters);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPlugin(placeholder);

	eleventyConfig.addFilter("sitemapExclude", function (collection) {
		return collection.filter(item => item.data.sitemap !== false);
	});

	eleventyConfig.addFilter("stringify", function (value) {
		return JSON.stringify(value);
	});

	eleventyConfig.addShortcode("shape", function (shape) {
		if (!shape) return "";
		if (!SHAPES[shape.toUpperCase()]) return "";

		return `<div class="shape shape-${shape.toLowerCase()}">${SHAPES[shape.toUpperCase()]}</div>`;
	});

	eleventyConfig.addShortcode("lazyImage", function (src, alt, width, height, placeholder) {
		if (!src) return "";
		if (!placeholder) placeholder = src;
		if (!alt) alt = "";
		if (!width) width = 0;
		if (!height) height = 0;

		return `<div class="lazy-image" style="--placeholder: url('${placeholder}')" ><img data-src="${src}" alt="${alt}" width="${width}" height="${height}"></div>`;
	});
};

export const config = {
	// Control which files Eleventy will process
	// e.g.: *.md, *.njk, *.html, *.liquid
	templateFormats: [
		"md",
		"njk",
		"html",
		"liquid",
		"11ty.js",
	],

	// Pre-process *.md files with: (default: `liquid`)
	markdownTemplateEngine: "njk",

	// Pre-process *.html files with: (default: `liquid`)
	htmlTemplateEngine: "njk",

	// These are all optional:
	dir: {
		input: "content",          // default: "."
		includes: "../_includes",  // default: "_includes" (`input` relative)
		layouts: "../_includes/layouts",    // default: "_layouts" (`input` relative)
		data: "../_data",          // default: "_data" (`input` relative)
		output: "_site"
	},

	// -----------------------------------------------------------------
	// Optional items:
	// -----------------------------------------------------------------

	// If your site deploys to a subdirectory, change `pathPrefix`.
	// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

	// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
	// it will transform any absolute URLs in your HTML to include this
	// folder name and does **not** affect where things go in the output folder.

	// pathPrefix: "/",
};
