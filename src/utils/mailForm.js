exports.setMailForm = function(param){
    const contenthtml =
    `<h1>${param.housenm}</h1>
    <ul>
        <li> 청약시작일 : ${param.rceptbgnde} </li>
        <li> 청약종료일 : ${param.rceptendde} </li>
        <li> 당첨자 발표일 : ${param.przwnerpresnatnde} </li>
    </ul>
    `
    return contenthtml;
}