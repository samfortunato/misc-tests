class MapsService {
  static save(map) {
    return fetch('http://localhost:3000/maps', {
      method: 'POST',
      body: this._createMapPayload(map),
    });
  }

  static _createMapPayload(map) {
    return JSON.stringify(map);
  }
}

const map1 = {
  id: 1,
  tiles: [
    [{ id: 1, attributes: { blocked: false } }, { id: 1, attributes: { blocked: false } }],
    [{ id: 1, attributes: { blocked: false } }, { id: 1, attributes: { blocked: false } }],
    [{ id: 1, attributes: { blocked: false } }, { id: 1, attributes: { blocked: false } }],
    [{ id: 1, attributes: { blocked: false } }, { id: 1, attributes: { blocked: false } }],
    [{ id: 1, attributes: { blocked: false } }, { id: 1, attributes: { blocked: false } }],
  ],
}

MapsService.save(map1);
