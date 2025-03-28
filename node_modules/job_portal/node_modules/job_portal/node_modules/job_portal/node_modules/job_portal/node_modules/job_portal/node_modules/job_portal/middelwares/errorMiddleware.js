const errorMiddleware = async (err, req, res, next) => {
    console.log(err); // Log error message
  const defaultErrors={
    statusCode :500,
    message : err
  }
  if(err.name=='validationError'){
    defaultErrors.statusCode=400;
    defaultErrors.message=Object.values(err.errors).map(item=>item.message).joi
  }

  // duplicate error
  if(err.code && err.code==1100){
    defaultErrors.statusCode=400;
    defaultErrors.message=`${Object.keys(err.keyValue)} field has to be unique `
  }
  res.status(defaultErrors.statusCode).json({message : defaultErrors.message})
};

  export default errorMiddleware;
  