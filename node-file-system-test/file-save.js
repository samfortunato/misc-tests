const fs = require('fs');

const map = {
  id: 1,
  tiles: [
    [{ id: 0, attrs: { blocked: false } }, { id: 0, attrs: { blocked: false } }],
    [{ id: 0, attrs: { blocked: false } }, { id: 0, attrs: { blocked: false } }],
    [{ id: 0, attrs: { blocked: false } }, { id: 0, attrs: { blocked: false } }],
    [{ id: 0, attrs: { blocked: false } }, { id: 0, attrs: { blocked: false } }],
    [{ id: 0, attrs: { blocked: false } }, { id: 0, attrs: { blocked: false } }],
  ],
};

const mapJson = JSON.stringify(map);
fs.writeFileSync(`map/map-${map.id}.json`, mapJson);

class MapService {
  static saveMap(map) {
    return new Promise((resolve, reject) => {
      try {
        const mapJson = JSON.stringify(map);
        fs.writeFileSync(`map/map-${map.id}.json`, mapJson);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}

MapService.saveMap(map)
  .then(() => this.mapEditor.exit());
