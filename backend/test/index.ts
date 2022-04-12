import request from 'supertest';

import app from '../src/server';

describe('Our server', function () {
  before(function (done) {
    app.listen(function (err) {
      if (err) return done(err);
      done();
    });
  });

  it('Try to create a collectible', function (done) {
    request(app)
      .post('/api/collectible/create')
      .set('Content-Type', 'application/json')
      .send({
        title: 'Title',
        description: 'Description',
        startPrice: 100,
        dateEnd: '09-04-2022'
      })
      .expect('Content-Type', /json/)
      .expect(200, function (err, res) {
        if (err) return done(err);
        console.log(res);
        done();
      });
  });
});