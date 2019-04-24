const COMPANY_MAX = 1000;
const DEPARTMENT_MAX = 10;
const GROUP_MAX = 5;

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomBool = () => {
  return Math.random() >= 0.5;
}

const fNameList = ['Aiden', 'Makenzie', 'Florence', 'Doug', 'Camila', 'Violet', 'Selena', 'Dani', 'Jacob', 'Louise', 'Owen', 'Anais', 'Fred', 'Teagan', 'Caleb', 'William', 'Helen', 'Livia', 'Ron', 'George', 'Michael', 'Ethan', 'Barry', 'Shelby', 'Stephanie', 'Michael', 'Percy', 'Nina', 'Daphne', 'Aileen', 'Margaret', 'Sabrina', 'Lana', 'Evelynn', 'Makena', 'Jade', 'Bob', 'Benny'];
const lNameList = ['Porter', 'Higgs', 'Carter', 'Moss', 'Devonport', 'Curtis', 'Rycroft', 'Hopkinson', 'Ellery', 'Fall', 'Thompson', 'Payne', 'Wilton', 'Dempsey', 'Butler', 'Dallas', 'Thatcher', 'Bowen', 'Douglas', 'Tobin', 'Jacobs', 'Harvey', 'Ryan', 'Morris', 'Mooney', 'Egerton', 'Williams', 'Leslie', 'Buckley', 'Wellington', 'Saunders', 'Rowlands', 'Watt', 'Calderwood', 'Eastwood', 'Morley', 'Ross', 'Weatcroft'];

const getRandomName = () => {
  return `${fNameList[getRandomInt(0, fNameList.length - 1)]} ${lNameList[getRandomInt(0, lNameList.length - 1)]}`;
}

const gNameList = ['alpha', 'beta', 'gamma', 'delta', 'epsilon'];
const cNameList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const getRandomCompanyName = () => {
  return `Company ${cNameList[getRandomInt(0, cNameList.length - 1)]}${cNameList[getRandomInt(0, cNameList.length - 1)]}${cNameList[getRandomInt(0, cNameList.length - 1)]}${cNameList[getRandomInt(0, cNameList.length - 1)]}`;
}

const getRandomGroupName = () => {
  return `Group ${gNameList[getRandomInt(0, gNameList.length - 1)]}`;
}

const formatNumber = (value) => {
  return (value * 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}


export const generateData = () => {
  let data = [];
  let count = 0;

  for (let i = 0; i < COMPANY_MAX; i++) {
    if (getRandomBool()) {
      const departments = generateDepartments();

      data.push({
        data: {
          name: getRandomCompanyName(),
          expenses: formatNumber(departments.expenses),
          employees: `${departments.employees}`,
          contact: getRandomName(),
        },
        children: departments.data,
        height: 32,
      })

      count+= departments.count;
    } else {
      const companyExpenses = getRandomInt(5, 100);
      const companyEmployees = getRandomInt(5, 20);

      data.push({
        data: {
          name: getRandomCompanyName(),
          expenses: formatNumber(companyExpenses),
          employees: `${companyEmployees}`,
          contact: getRandomName(),
          height: 32,
        }
      })
    }

    count++;
  }

  return {
    data: data,
    count: count,
  }
}


const generateDepartments = () => {
  let data = [];
  let count = 0;
  let expenses = 0;
  let employees = 0;

  for (let i = 0; i < DEPARTMENT_MAX; i++) {
    const groups = generateGroups();
    data.push({
      data: {
        name: `Department ${i+1}`,
        expenses: formatNumber(groups.expenses),
        employees: `${groups.employees}`,
        contact: getRandomName(),
      },
      children: groups.data,
    });

    employees+= groups.employees;
    expenses+= groups.expenses;
    count+= groups.count;
    count++;
  }

  return {
    data: data,
    count: count,
    employees: employees,
    expenses: expenses,
  }
}

const generateGroups = () => {
  let data = [];
  let count = 0;
  let expenses = 0;
  let employees = 0;

  for (let i = 0; i < GROUP_MAX; i++) {
    const groupExpenses = getRandomInt(2, 100);
    const groupEmployees = getRandomInt(2, 10);

    data.push({
      data: {
        name: getRandomGroupName(),
        expenses: formatNumber(groupExpenses),
        employees: `${employees}`,
        contact: getRandomName(),
      },
    });

    employees+= groupEmployees;
    expenses+= groupExpenses;
    count++;
  }

  return {
    data: data,
    count: count,
    employees: employees,
    expenses: expenses,
  }
}
