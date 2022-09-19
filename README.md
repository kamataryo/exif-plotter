# EXIF Plotter

A tool to read GPS data from large amount of image files, generate vector tiles and preview it.

## develop and usage

```shell
# build
$ docker build -t kamataryo/exif-plotter .

# run
$ docker run \
  --rm -v $(pwd)/images:/images \
  -v $(pwd)/out:/out \
  -p 3000:3000 \
  -it kamataryo/exif-plotter

# run without exif-reading process
$ docker run \
  --env SKIP_EXIF=true \
  --rm -v $(pwd)/images:/images \
  -v $(pwd)/out:/out \
  -p 3000:3000 \
  -it kamataryo/exif-plotter
```
