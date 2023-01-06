document.getElementById("submit").addEventListener("click", function () {
    var username = document.getElementById("username").value;
    const key = window.localStorage.getItem(username);
    if (key == null) {
      fetch(`https://api.github.com/users/${username}`)
        .then(async (data) => {
          if (data.status != 404) {
            var result = await data.json();
  
            if (result.bio) var clearBio = result.bio.replace(/\n/g, "<br />");
            else var clearBio = "";
  
            setData(result.name, result.location, result.blog, result.avatar_url)
  
            // queries[result.name] = result;
            window.localStorage.setItem(username, JSON.stringify(result));
          } else {
  
            setData("User not found", "", "", "", "")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      var result = window.localStorage.getItem(username);
      result = JSON.parse(result)
  
      setData(result.name, result.location, result.blog, result.avatar_url, result.bio)
    }
  });
  
  
  function setData(nameValue, locationValue, blogValue, avatarValue, bioValue) {
    var name = document.getElementById("name");
    var avatar = document.getElementById("avatar");
    var location = document.getElementById("location");
    var blog = document.getElementById("blog");
    var bio = document.getElementById("bio");
  
    if (bioValue) var clearBio = bioValue.replace(/\n/g, "<br />");
    else var clearBio = "";
  
    avatrEmpty = false
    if ( avatarValue == "" )
      avatrEmpty = true
    
    name.innerHTML = nameValue;
    location.innerHTML = locationValue;
    blog.innerHTML = blogValue;
    blog.setAttribute("href", blogValue);
    avatar.setAttribute("src", avatarValue);
    avatar.hidden = avatrEmpty;
    bio.innerHTML = clearBio;
  }