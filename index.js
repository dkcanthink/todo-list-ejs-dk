import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const initialTodayTodos = [];
const initialPersonalTodos = [];
const initialWorkTodos = [];

app.get("/", (req,res)=>{
    res.render("index.ejs", { todayTodos: initialTodayTodos });
})

app.get("/work", (req,res)=>{
    res.render("work.ejs", { workTodos: initialWorkTodos });
})

app.get("/personal", (req,res)=>{
    res.render("personal.ejs", { personalTodos: initialPersonalTodos });
})


app.post('/add', (req, res) => {
    const newTodo = req.body.todo;
    const listType = req.body.listType;

    if (newTodo.trim() !== '' && listType === 'today') {
        initialTodayTodos.push(newTodo);
    }
    res.redirect('/');
});

app.post('/personal/add', (req, res) => { //
    const newTodo = req.body.todo;
    const listType = req.body.listType;

    if (newTodo.trim() !== '' && listType === 'personal') {
        initialPersonalTodos.push(newTodo);
    }
    res.redirect('/personal'); // Redirect back to the personal list page
});

app.post('/work/add', (req, res) => { //
    const newTodo = req.body.todo;
    const listType = req.body.listType;

    if (newTodo.trim() !== '' && listType === 'work') {
        initialWorkTodos.push(newTodo);
    }
    res.redirect('/work'); // Redirect back to the work list page
});

app.listen(port, () =>{
    console.log(`Server running on port ${port}!`)
})