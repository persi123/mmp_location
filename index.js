const express = require('express');
const axios = require('axios');
var cors = require('cors');

const app = express();

const getUpdatedToken = async () => {
  //   const form = new FormData();
  const authObj = {
    grant_type: 'client_credentials',
    client_id:
      // "33OkryzDZsJaaJM_zyCcr0YM5EAjvAawRFZN1jx4LWRjk-eflbwyRB5oFli6pHDgXgAFq259VAN_AXhu2jU9RQ==",
      '33OkryzDZsKQfAoRI-sDsHYKHPEMvT1nayPUO8uW8KWUnhSixp_ekNueE-YnbFMFTRAEN_fPBjJOO8lSWXNhKQ==',
    client_secret:
      // "lrFxI-iSEg-EDQkMk9-AnBetcqKhoaxhjOQ5bsNkZTp667wH5BXVQeHEO360qodO0yB-imZlb4ObmnVfZ7nb4l_-z6pSMF9N",
      'lrFxI-iSEg-dAU2lqjyHwfQ3vrj8dY23mAM7qGP85PRl27TjwO6oxcNfimlmGltAVcvwOjvsNo8hakpjYRcvhALCeVTpUkhg',
  };
  const body = new URLSearchParams(authObj);

  //   form.append("grant_type", "client_credentials");
  //   form.append(
  //     "client_id",
  //     "33OkryzDZsJaaJM_zyCcr0YM5EAjvAawRFZN1jx4LWRjk-eflbwyRB5oFli6pHDgXgAFq259VAN_AXhu2jU9RQ=="
  //   );
  //   form.append(
  //     "client_secret",
  //     "lrFxI-iSEg-EDQkMk9-AnBetcqKhoaxhjOQ5bsNkZTp667wH5BXVQeHEO360qodO0yB-imZlb4ObmnVfZ7nb4l_-z6pSMF9N"
  //   );

  const response = await axios.post(
    `https://outpost.mapmyindia.com/api/security/oauth/token`,
    body
  );
  return response.data;
};

app.use(cors());

app.get('/', async (req, res) => {
  const { access_token } = await getUpdatedToken();
  // console.log(req.body, "reqqq");

  const { city = 'delhi', region = 'ind', location = '' } = req.query;
  //   console.log(req.query, { access_token });
  try {
    const response = await axios.get(
      `https://atlas.mapmyindia.com/api/places/search/json?query=${city}&location=${location}&region=${region}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res.status(200).json({
      data: response.data,
    });
  } catch (err) {
    console.log('err', err);
    return res.status(404).json({
      err: 'code tha ftt gya ',
    });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
