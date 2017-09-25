const updateHistory = (location,time) => {
    const formattedTime = convertToDateTime(time);
    
    let itemRows = ``;
    itemRows += `
    <tr>
    <td>${location}</td>
    <td>${formattedTime}</td>
    </tr>`;


    const table = document.getElementById('history-table');
    if(table.childElementCount>=5){
        table.removeChild(table.firstElementChild);
    };
    document.getElementById('history-table').insertAdjacentHTML("afterbegin",itemRows);
};