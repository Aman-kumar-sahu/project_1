var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp",{
	useNewUrlParser:true,
	useUnifiedTopology:true
})
.then(()=>console.log("Connected to DB!"))
.catch(error=>console.log(error.massage));

var campgroundSchema=new mongoose.Schema({
	name:String,
	image:String,
	description:String
});

var Campground=mongoose.model("Campground",campgroundSchema);

// Campground.create({
// 	name:"Raindear",
// 	image:"https://www.photosforclass.com/download/px_699558",
// 	description:"This is a great hill,people usually find it a quit place to relax."
// },function(err,campground){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log("New Campground had been created");
// 		console.log(campground);
// 	}
// });

// Campground.find({},function(err,campground){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log("find starts here");
// 		console.log(campground);
// 	}
// });

// var campgrounds=[
// 		{name:"Raindear",image:"https://www.photosforclass.com/download/px_699558"},
// 		{name:"Tool",image:"https://www.photosforclass.com/download/px_1061640"},
// 		{name:"Camera",image:"https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350"},
// 	{name:"Raindear",image:"https://www.photosforclass.com/download/px_699558"},
// 		{name:"Tool",image:"https://www.photosforclass.com/download/px_1061640"},
// 		{name:"Camera",image:"https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350"},
// 	{name:"Raindear",image:"https://www.photosforclass.com/download/px_699558"},
// 		{name:"Tool",image:"https://www.photosforclass.com/download/px_1061640"},
// 		{name:"Camera",image:"https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350"}
// 	];


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.listen(process.env.PORT||3000,process.env.IP,function(){
    console.log("Server Connected!!");
});

app.get("/",function(req,res){
	res.send("Hi");
});

app.get("/campgrounds",function(req,res){
	Campground.find({},function(err,allcampgrounds){
	if(err){
		console.log(err);
	}else{
		res.render("index",{campgrounds:allcampgrounds});
	}
});
});

app.post("/campgrounds",function(req,res){
	var naam=req.body.name;
	var pic=req.body.image;
	var desc=req.body.description;
	var newCampground={name:naam,image:pic,description:desc};
	//create a new campground and save to DB
	Campground.create(newCampground,function(err,newlyCampground){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
		}
	});
});

app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

app.get("/campgrounds/:id",function(req,res){
	//find the campground with provided id
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			//render show template with that campground
			res.render("show",{campground:foundCampground});
		}
	});
});