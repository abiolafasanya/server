app.get('/', (req, res) => {
    res.render('pages/index');
  });
  
  app.post('/upload-images', upload.single('photo'), async (req, res) => {
    try {
      const uploader = await helpers.cloudinaryUploader(req);
      res.status(200).json({
        status: 'success',
        data: uploader,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'error', error: error });
    }
  });