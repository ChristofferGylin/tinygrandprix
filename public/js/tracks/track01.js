export const track01 = {

    aiCheckPointsArray: [],
    startPosition: { x: 2484, y: 3280 },
    trackName: 'Ziggy Zaggy',
    key: 'track01',
    layers: [
        { name: 'grass', tileset: 'track-tileset1', obstacle: false },
        { name: 'asphalt', tileset: 'track-tileset1', obstacle: false },
        { name: 'candystripe', tileset: 'track-tileset1', obstacle: false },
        { name: 'railing', tileset: 'track-tileset1', obstacle: true },
        { name: 'road-decals', tileset: 'track-decal-tileset1', obstacle: false },
        { name: 'turbo', tileset: 'track-decal-tileset1', obstacle: false }
    ],
    numberOfCheckpoints: 38,
    numberOfLaps: 3,
    obstacles: [],
    tilemapPath: 'assets/tilemaps/track01.json',
    tilemap: null,
    tilesets: [
        { path: 'assets/tilesets/track-tileset1.png', key: 'tiles', name: 'track-tileset1' },
        { path: 'assets/tilesets/track-decal-tileset1.png', key: 'tiles2', name: 'track-decal-tileset1' }
    ],
    thumbnail: 'track01-thumbnail.png'

}