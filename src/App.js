//1. Import Area
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';

import './App.css';



//2. Defination area
function App() {
  //2.1 Hooks area
  const [file,setFile] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);


  useEffect(()=>{

  },[]);
  //2.2 function defination area
  let handleChange = (e)=>{
    let img = document.getElementById("imgPreview");
    console.log(e.target.files[0].type);
    let file = e.target.files[0];
    setFile(file);
    //setFile(e.target.files[0]);
    //Lets do the validaltion
    if(file.type === 'image/jpeg' || file.type === 'image/png'){
        //I can upload the file
        //alert('I can upload the file');
        img.src = URL.createObjectURL(file);//'https://www.datocms-assets.com/45470/1631110818-logo-react-js.png';

    }else{
      //show the error
      alert('Please upload image only');
      return 
    }
    //alert('OKOKKOKKOKOK');
  }

  let handleUpload = (e)=>{
    //alert('HI');

    const formData = new FormData();
    formData.append('files', file );

    axios.post('http://localhost:1337/api/upload', formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress : (progressEvent) => {
        var progress = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        console.log(progress);
        setUploadPercentage(progress);
          // Update state here
        // onUploadProgress(progress);
        if(progress===100){
          //setUploadPercentage(0);
          swal("Good job!", "Image uploaded successfully!", "success");
        } 
        
      }
    });



  }

  //2.3 Return statemtn
  return (
    <div className="App">
          <form>
             <input type="file" name="anil" onChange={(e)=>{ handleChange(e)}} />
             <input type="button" value="Upload" onClick={handleUpload} />
          </form>
          <br />
          <img width="200" src="" id="imgPreview" />
          {
            uploadPercentage > 0 &&
            <div className="progress w-50 offset-3" role="progressbar" aria-label="Success striped example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar progress-bar-striped bg-success" style={{width: uploadPercentage+"%"}}></div>
            </div>
          }
    </div>
  );
}

//3. Export area
export default App;
