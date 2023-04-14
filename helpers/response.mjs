import {response} from 'express';

const responseData= {
  success: false,
  message: '',
  data: null,
};

response.OK= function(data) {
  const res= {
    ...responseData,
  };
  res.success= true;
  res.message= 'aksi berhasil dilakukan.';
  res.data= data;

  return this.status(200).json(res);
};

response.BAD_REQUEST= function(errors) {
  responseData.message= 'harap cek data yang anda kirimkan.';
  responseData.data= {
    errors,
  };

  return this.status(400).json(responseData);
}
;
response.NOT_FOUND= function(resource= 'path') {
  responseData.message= 'harap cek data yang anda kirimkan.';
  responseData.data= {
    error: `${resource} tidak ditemukan.`,
  };

  return this.status(404).json(responseData);
};

response.INTERNAL_SERVER_ERROR= function() {
  responseData.message= 'terjadi keslahan di server';

  return this.status(500).json(responseData);
};
