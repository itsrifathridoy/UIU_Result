document.getElementById("resetLast").addEventListener("click",(e)=> {
    location.reload();
});
document.getElementById("reset").addEventListener("click",(e)=> {
    location.reload();
});
document.getElementById("resetbtn").addEventListener("click",(e)=> {
    location.reload();
});
const searchBtn = document.getElementById("search");
searchBtn.addEventListener("click",(e)=>{
    DisplayLoader();
    const id = document.getElementById("id").value.trim();
    const url = `https://script.google.com/macros/s/AKfycbx46TRyqp50QmkzJ91S8Gj_xc6o3_YsJ4lnzSIrul-TptKjxAA/exec?id=${id}`
    fetch(url)
        .then(d=> d.json())
        .then(d=> {
            const loader = document.getElementById("loader");
            loader.style.display = "none";
            if(d.status==200 && d.result.length>0)
            {
                displayResult(d,id);
            }
            else
            {
                document.getElementById("heading").textContent = "";
                const resultTable = document.getElementById("resultTable");
                resultTable.innerHTML="";
                document.getElementById("heading").textContent =   "Result Not Found";
                document.getElementById("head").style.display= "flex";
            }
            
        });
});
function displayResult(data,roll)
{
    const resultDiv = document.getElementById("results");
    const resultTable = document.getElementById("resultTable");
    const tableHeading = ["ID","GPA","CGPA","Calender ID","Year","Trimester"];
   const tr = document.createElement("tr");
   resultTable.appendChild(tr);
   for(let i=0;i<tableHeading.length;i++)
    {
        const th = document.createElement("th");
        th.innerText = tableHeading[i];
        tr.appendChild(th);
    }
    for(i=0;i<data.result.length;i++)
    {
        const tr = document.createElement("tr");
        resultTable.appendChild(tr);
        const id = document.createElement("td");
        const cId = document.createElement("td");
        const gpa = document.createElement("td");
        const cgpa = document.createElement("td");
        const year = document.createElement("td");
        const trimester = document.createElement("td");
        id.innerText = roll;
        tr.appendChild(id);
        gpa.innerText = data.result[i].GPA;
        tr.appendChild(gpa);
        cgpa.innerText = data.result[i].TranscriptCGPA;
        tr.appendChild(cgpa);
        cId.innerText = data.result[i].AcademicCalenderID;
        tr.appendChild(cId);
        year.innerText = data.result[i].Year;
        tr.appendChild(year);
        trimester.innerText = data.result[i].TypeName;
        tr.appendChild(trimester);
    }
    resultDiv.style.display = "block";
}
function DisplayLoader()
{
    document.getElementById("heading").textContent = "";
    const searchDiv = document.getElementById("container");
    searchDiv.style.display = "none";
    const resultTable = document.getElementById("resultTable");
    resultTable.innerHTML="";
    const loader = document.getElementById("loader");
    loader.style.display = "flex";
}
