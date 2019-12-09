var app = angular.module('MyApp', []);

app.controller('mainController', function($scope, $http) {
    var href_list=window.location.href.split("/");
    var username=href_list[4];
    var topMovies = document.getElementById("top-movies");
      var history = document.getElementById("search-history");
      topMovies.href=topMovies.href+ "/" + username;
    $http({
        url: '/popularList',
        method: "POST",
    }).then(
        res => {
          $scope.popular=res.data;
        },err => {
            console.log("Mainpage content loading error: ", err);
    });

    $http({
        url: '/ratingList',
        method: "POST",
    }).then(
        res => {
          $scope.highrating=res.data;
        },err => {
            console.log("Mainpage content loading error: ", err);
    }); 

    $http({
        url: '/recentList',
        method: "POST",
    }).then(
        res => {
          $scope.recent=res.data;
        },err => {
            console.log("Mainpage content loading error: ", err);
    }); 

    $http({
        url: '/imdbHighList',
        method: "POST",
    }).then(
        res => {
          $scope.imdbhigh=res.data;
        },err => {
            console.log("Mainpage content loading error: ", err);
    }); 

    $http({
        url: '/rtHighList',
        method: "POST",
    }).then(
        res => {
          $scope.rthigh=res.data;
        },err => {
            console.log("Mainpage content loading error: ", err);
    }); 

    $scope.search = function() {
        $http({
            url: '/search',
            method: "POST",
            data:{
                title:$scope.title,
            }
        }).then(
            res => {
              $scope.searchtitle=res.data;
              $scope.title="";
              document.getElementById("name").innerHTML="";
            },err => {
                console.log("Mainpage content loading error: ", err);
        }); 
    }

    $scope.goInfo = function(title) {
      $http({
          url: '/goInfo/'+title,
          method: 'POST',
          data:{
            'title':title,
            'username':username
          }
      }).then(res => {
          if (res.data.status=='success'){
            window.location.href = "http://localhost:8001/InfoPage/"+username+"/::"+res.data.id;
          }else{
            alert("Sorry there is no detail of this movie :( ");
          }

        }, err => {
          console.log("movieName ERROR: ", err);
      });
    }

    // $scope.addConstraint = function(){
    //     var constraint_list=document.getElementById("search-input");
    //     // add new search element
    //     var new_element=document.createElement("div");
    //     new_element.style.display="flex";
    //     new_element.style.flexFlow="column";
    //     new_element.style.width="32vw";
    //     new_element.style.minWidth="400px";
    //     new_element.style.minHeight="50px";
    //     new_element.setAttribute("class","search-element");
    //     new_element.style.flexFlow="row";
    //     constraint_list.appendChild(new_element);

    //     var new_toggle=document.createElement("div");
    //     new_toggle.style.display="flex";
    //     new_toggle.setAttribute("class","dropdown-toggle btn btn-primary");
    //     new_toggle.style.color="white";
    //     new_element.appendChild(new_toggle);
    //     new_toggle.style.height="40px";
    //     new_toggle.style.width="160px";
    //     new_toggle.style.alignSelf="flex-start";
    //     new_toggle.style.justifyContent="flex-start";
    //     new_toggle.style.alignItems="center";
    //     new_toggle.setAttribute("data-toggle","dropdown");

    //     var new_dropdown=document.createElement("div");
    //     new_dropdown.style.display="flex";
    //     new_dropdown.style.alignItems="center";
    //     new_toggle.appendChild(new_dropdown);

    //     var new_text=document.createElement("p");
    //     new_text.style.display="flex";
    //     new_text.style.width="120px";
    //     new_text.style.height="30px";
    //     new_text.style.fontSize="medium";
    //     new_text.style.margin="6px 0 5px 0";
    //     new_text.setAttribute("class","conditions");
    //     new_dropdown.appendChild(new_text);

    //     var new_dropmenu=document.createElement("div");
    //     new_dropdown.appendChild(new_dropmenu);
    //     new_dropmenu.setAttribute("class","dropdown-menu");
    //     var new_item1=document.createElement("a");
    //     new_item1.innerHTML="Genre";
    //     new_item1.style.fontSize="12px";
    //     new_item1.setAttribute("class","dropdown-item");
    //     var new_item2=document.createElement("a");
    //     new_item2.innerHTML="Title";
    //     new_item2.style.fontSize="12px";
    //     new_item2.setAttribute("class","dropdown-item");
    //     var new_item3=document.createElement("a");
    //     new_item3.innerHTML="Director";
    //     new_item3.style.fontSize="12px";
    //     new_item3.setAttribute("class","dropdown-item");
    //     var new_item4=document.createElement("a");
    //     new_item4.innerHTML="Delete";
    //     new_item4.style.color="red";
    //     new_item4.style.fontSize="12px";
    //     new_item4.setAttribute("class","dropdown-item");
    //     new_dropmenu.appendChild(new_item1);
    //     new_dropmenu.appendChild(new_item2);
    //     new_dropmenu.appendChild(new_item3);
    //     new_dropmenu.appendChild(new_item4);
    //     new_dropdown.setAttribute("aria-haspopup","true");
    //     new_dropdown.setAttribute("aria-expanded","false");

    //     new_item1.addEventListener("click",function(event){
    //         event.currentTarget.parentElement.parentElement.firstElementChild.innerHTML=event.currentTarget.innerHTML;
    //         const input_area=document.createElement("textarea");
    //         if (event.currentTarget.parentElement.parentElement.parentElement.parentElement.childNodes.length==1){
    //             event.currentTarget.parentElement.parentElement.parentElement.parentElement.appendChild(input_area);
    //         }else{
    //             event.currentTarget.parentElement.parentElement.parentElement.parentElement.lastElementChild.remove();
    //             event.currentTarget.parentElement.parentElement.parentElement.parentElement.appendChild(input_area);
    //         }
    //         input_area.style.minWidth="200px";
    //         input_area.style.width="20vw";
    //         input_area.style.height="30px";
    //         input_area.style.margin="5px 0 10px 20px";
    //         input_area.setAttribute("placeholder","Input genres, seperated by comma.");
    //         input_area.style.fontSize="medium";
    //     });
    //     new_item2.addEventListener("click",function(event){
    //         event.currentTarget.parentElement.parentElement.firstElementChild.innerHTML=event.currentTarget.innerHTML;
    //         const input_area=document.createElement("textarea");
    //         if (event.currentTarget.parentElement.parentElement.parentElement.parentElement.childNodes.length==1){
    //             event.currentTarget.parentElement.parentElement.parentElement.parentElement.appendChild(input_area);
    //         }else{
    //             event.currentTarget.parentElement.parentElement.parentElement.parentElement.lastElementChild.remove();
    //             event.currentTarget.parentElement.parentElement.parentElement.parentElement.appendChild(input_area);
    //         }
    //         input_area.style.minWidth="200px";
    //         input_area.style.width="20vw";
    //         input_area.style.height="30px";
    //         input_area.style.margin="5px 0 10px 20px";
    //         input_area.setAttribute("placeholder","Input titles, seperated by comma.");
    //         input_area.style.fontSize="medium";
    //     });
    //     new_item3.addEventListener("click",function(event){
    //         event.currentTarget.parentElement.parentElement.firstElementChild.innerHTML=event.currentTarget.innerHTML;
    //         const input_area=document.createElement("textarea");
    //         if (event.currentTarget.parentElement.parentElement.parentElement.parentElement.childNodes.length==1){
    //             event.currentTarget.parentElement.parentElement.parentElement.parentElement.appendChild(input_area);
    //         }else{
    //             event.currentTarget.parentElement.parentElement.parentElement.parentElement.lastElementChild.remove();
    //             event.currentTarget.parentElement.parentElement.parentElement.parentElement.appendChild(input_area);
    //         }
    //         input_area.style.minWidth="200px";
    //         input_area.style.width="20vw";
    //         input_area.style.height="30px";
    //         input_area.style.margin="5px 0 10px 20px";
    //         input_area.setAttribute("placeholder","Input releasing year, seperated by comma.");
    //         input_area.style.fontSize="medium";
    //     });
    //     new_item4.addEventListener("click",function(event){
    //         event.currentTarget.parentElement.parentElement.firstElementChild.innerHTML=event.currentTarget.innerHTML;
    //         const input_area=document.createElement("textarea");
    //         if (event.currentTarget.parentElement.parentElement.parentElement.parentElement.childNodes.length==1){
    //             event.currentTarget.parentElement.parentElement.parentElement.parentElement.appendChild(input_area);
    //         }else{
    //             event.currentTarget.parentElement.parentElement.parentElement.parentElement.lastElementChild.remove();
    //             event.currentTarget.parentElement.parentElement.parentElement.parentElement.appendChild(input_area);
    //         }
    //         input_area.style.minWidth="200px";
    //         input_area.style.width="20vw";
    //         input_area.style.height="30px";
    //         input_area.style.margin="5px 0 10px 20px";
    //         input_area.setAttribute("placeholder","Input director names, seperated by comma.");
    //         input_area.style.fontSize="medium";
    //     });
    //   }
      
    // $scope.search = function(){
    //     var search_list=document.getElementById("search-input");
    //     var search_input=[]
    //     for (index=0;index<search_list.childElementCount;index++){
    //         var curr_constraint=search_list.children[index];
    //         var target_value=search_list.children[index].children[1].value;
    //         search_input.push(`${curr_constraint.firstElementChild.firstElementChild.firstElementChild.innerHTML}=${target_value}`);
    //     }
        
    //     $http({
    //         url: '/search',
    //         method: 'POST',
    //         data:{
    //           'input': search_input,
    //           'username': username
    //         }
    //     }).then(
    //         res =>{},
    //         err =>{}
    //     )
    // }
  
});
