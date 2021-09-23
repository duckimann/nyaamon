# Nyaamon

### Daily check & get torrent from nyaa.si
### Can run directly on NodeJS or build to Docker image
<hr>

## Files
``` hashes.txt ``` saves torrent's hash, 1 hash each line

``` keywords.txt ``` saves keyword to search torrents on Nyaa

Syntax:
```
# start with this will be ignore
# 0 is trusted or not (url query param "f=0")
# 0_0 torrent type (url query param "c=0_0")

0 0_0 keywords
```

<hr>

## Directory tree (should looks like)
### Running on NodeJS
``` 
/
|   commands.sh
|   docker-compose.yml
|   dockerfile
|   index.js
|   LICENSE
|   package-lock.json
|   package.json
|   readme.md
|   utils.sh
|   
+---torrents
\---txt
        hashes.txt
        keywords.txt
        log.txt
```
### Running on Docker-Compose
```
/
| docker-compose.yml
+---torrents
\---txt
		hashes.txt
        keywords.txt
        log.txt
```