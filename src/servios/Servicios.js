async function postData(endpoint,obj) {
  try {
    const response = await fetch(`http://localhost:3001/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    return response.json();
  } catch (error) {
    console.error("Error en postData:", error);
  }
}
async function getData(endpoint) {
  try {
    const response = await fetch(`http://localhost:3001/${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error en getData:", error);
  }
}
async function deleteData(endpoint,id) {
  try {
    const response = await fetch(`http://localhost:3001/${endpoint}/${id}`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data);
    return data
  } catch (error) {
    console.error("Error en deleteData:", error);    
  }
  
}
async function patchData(endpoint,obj,id) {
  try {
    const response = await fetch(`http://localhost:3001/${endpoint}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    return response.json();
  } catch (error) {
    console.error("Error en patchData:", error);
  }
}

export { postData, getData ,deleteData,patchData};