import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '', process: ''});
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: [], selectedFile: '', process: '' });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Harap login untuk merekam dan mengedit rekap nomor pelayanan.
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Mengedit "${post?.title}"` : 'Rekam nomor pelayanan'}</Typography>
        <TextField name="Nopel" variant="outlined" label="Nomor pelayanan" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="Jenis" variant="outlined" label="Jenis layanan" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="Nama"
            variant="outlined"
            label="Nama pemohon"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        <TextField name="Proses" variant="outlined" label="Proses berkas" fullWidth multiline rows={4} value={postData.process} onChange={(e) => setPostData({ ...postData, process: e.target.value })} />
        <>
          <Button onClick={() => setPostData({ ...postData, process: "PENERIMAAN BERKAS DAN PEMBUATAN NOMOR PELAYANAN" })}>1</Button>
          <Button onClick={() => setPostData({ ...postData, process: "PENDATAAN OLEH PENGOLAH DATA DAN INFORMASI"})}>2</Button>
          <Button onClick={() => setPostData({ ...postData, process: "VERIFIKASI BERKAS OLEH PENDATA"})}>3</Button>
          <Button onClick={() => setPostData({ ...postData, process: "PENANDATANGANAN OLEH KASUBAG TATA USAHA DAN KEPALA UPT WILAYAH IV"})}>4</Button>
          <Button onClick={() => setPostData({ ...postData, process: "PENGIRIMAN BERKASI DAN PENGERJAAN BERKAS OLEH BAPENDA PUSAT"})}>5</Button>
          <Button onClick={() => setPostData({ ...postData, process: "SPPT JADI DAN SIAP DIAMBIL"})}>6</Button>
        </>
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
