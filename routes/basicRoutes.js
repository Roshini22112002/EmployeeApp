const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

let data = [
  { id: 1, EmployeeName: "Asti", EmployeeDesignation:"Manager", EmployeeLocation: "M.Thurai",Salary:40000 },
  { id: 2, EmployeeName: "Assencio", EmployeeDesignation:"Team lead", EmployeeLocation: "Vallavilai",Salary:30000 },
  { id: 3, EmployeeName: "Achu", EmployeeDesignation:"Staff", EmployeeLocation: "Neerodi" ,Salary:25000}
];

function employeeroutes(nav) {

  router.get('/', (req, res) => {
    res.render("home", { title: 'EJS', data, nav });
  });
  router.get('/form', (req, res) => {
    res.render("addEmployee", { title: 'Form', nav });
  });
  router.post('/add', (req, res) => {
    const newId = data.length ? data[data.length - 1].id + 1 : 1;
    data.push({ id: newId, ...req.body });
    res.redirect('/basic');
  });


  router.get(['/edit', '/edit/'], (req, res) => {
    res.redirect('/basic');  
  });
  router.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const employee = data.find(e => e.id === id);

    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    res.render('editEmployee', { title: 'Edit Employee', employee, nav });
  });
  router.post('/edit/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);
    const index = data.findIndex(e => e.id === employeeId);

    if (index !== -1) {
      data[index] = { id: employeeId, ...req.body };
    }

    res.redirect('/basic');
  });
  router.post('/delete/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);
    data = data.filter(e => e.id !== employeeId);
    res.redirect('/basic');
  });

  return router;
}

module.exports = employeeroutes;