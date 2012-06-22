function resolve(){
    if (process){ return require("resourceful"); }
    else{ return window ? window.resourceful : require("resourceful"); }
};

(function (resourceful){
    var FacebookUser = resourceful.define("FacebookUser", function (){
        //first_name,last_name,locale,gender,username,birthday,hometown
        this.property("id");
        this.property("first_name");
        this.property("last_name");
        this.property("locale");
        this.property("gender");
        this.property("username");
        this.property("birthday");
        this.property("hometown");
    });

    module.exports = FacebookUser;

})(resolve());
