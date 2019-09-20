const express = require('express');
const router = express.Router();
const request  = require('../util/request');

router.get('/songs', async (req, res, next) => {
  const { type = 5, raw } = req.query;

  const result = await request({
    url: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
    data: {
      data: JSON.stringify({
        comm: {
          ct: 24
        },
        new_song: {
          module: "newsong.NewSongServer",
          method: "get_new_song_info",
          param: {
            type: type / 1,
          }
        }
      })
    }
  });

  if (Number(raw)) {
    res.send(result);
  } else {
    const { lan, type, songlist } = result.new_song.data;
    res.send({
      result: 100,
      data: {
        lan,
        list: songlist,
        type,
      },
    })
  }

});

module.exports = router;