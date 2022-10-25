function validate(values){
    let error = {};

      if(!values.name){
      error.name= 'Name is required';
      }
      if(values.name && !/^[a-zA-Z]*$/.test(values.name)){
        error.name = 'The name can not contain numbers or special caracters'
    }
      if (!values.min_height) {
        error.min_height = "Please, enter the min height";
      }
      if (values.min_height < 0){
        error.min_height = "Invalid height";
      }
      if (values.min_height && values.max_height && parseInt(values.min_height) >= parseInt(values.max_height)) {
        error.height = "The max height must be greater than the min height";
      }
      if (!values.max_height) {
        error.heightMax = "Please, enter the max height";
      } 
      if (!values.min_weight || values.min_weight < 0) {
        error.weightMin = "Please, enter the min weight";
      } 
      if (values.min_weight && values.max_weight && parseInt(values.min_weight) >= parseInt(values.max_weight)) {
        error.weight = "The max weight must be greater than the min weight";
      }
      if (!values.max_weight) {
        error.weightMax = "Please, enter the max weight";
      }
      
  
    return error
  }

  
  export default validate;