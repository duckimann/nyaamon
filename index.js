const fs = require("fs"),
	{ JSDOM } = require("jsdom"),
	request = require("request");

const files = {
	log: `${__dirname}/txt/log.txt`,
	hashes: `${__dirname}/txt/hashes.txt`,
	keywords: `${__dirname}/txt/keywords.txt`,
	torrents: `${__dirname}/torrents`,
}, File = {
	getKeywords: () => fs.readFileSync(files.keywords, {encoding: "utf-8"}).split("\n").filter((a) => !!a && !/^#/.test(a)).map((a) => ({ trusted: a.slice(0, 1), type: a.slice(2, 5), key: a.slice(6) })),
	getHashes: () => fs.readFileSync(files.hashes, {encoding: "utf-8"}).split("\n").filter((a) => !!a).map((a) => a.replace(/\\r/g, "")),

	writeHashes: (txt) => fs.writeFileSync(files.hashes, `${txt}\n`, {flag: "a"}),
	writeLog: (txt) => {
		console.log(txt);
		let d = new Date(),
			dStr = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
		fs.writeFileSync(files.log, `${dStr} || ${txt}\n`, {flag: "a"});
	},
};

function getTorrent() {
	File.getKeywords()
		.reduce((cp, item) => cp.then((resArr) => new Promise((resolve) => {
			let url = `https://nyaa.si/?page=rss&q=${encodeURIComponent(item.key)}&c=${item.type}&f=${item.trusted}`,
				hashes = File.getHashes();
			File.writeLog(`Fetching ${url}`);
			request(url, function(err, res, body) {
				let item = new JSDOM(body, {contentType: "application/xml"}).window.document.querySelectorAll("item"),
					details = Array.from(item, (b) => ({
						title: b.children[0].innerHTML,
						link: b.children[1].innerHTML,
						guid: b.children[2].innerHTML,
						pubDate: b.children[3].innerHTML,
						hash: b.children[7].innerHTML,
						size: b.children[10].innerHTML,
					}));
				setTimeout(() => {
					for (let torr of details) {
						let exists = !hashes.includes(torr.hash);
						File.writeLog(`${exists} | ${torr.hash} | ${torr.title}`);
						if (exists) resArr.push(torr);
					}
					resolve(resArr);
				}, 5000);
			});
		})), Promise.resolve([]))
		.then((torrents) => {
			File.writeLog(`Found ${torrents.length} torrent(s).`);
			return torrents.reduce((cp, torrent) => cp.then(() => new Promise((resolve) => {
				File.writeHashes(torrent.hash);
				request(torrent.link)
					.pipe(fs.createWriteStream(`${__dirname}/torrents/${torrent.link.match(/[^\\\/]*$/g)[0]}`))
					.on("close", () => {
						setTimeout(() => {
							resolve();
						}, 2000);
					});
			})), Promise.resolve());
		})
		.finally(() => File.writeLog("Done.\n"));
}

getTorrent();
setInterval(getTorrent, 60*60*24 * 1000);
