let checkAns = (anskey, userAns, marks, sequence) => {
    let totalMarks = 0;
    for (let index = 0; index < anskey.length; index++) {
        if (anskey[index] == (userAns[index])) {
            let markIndex = checkDiffficultyLevel(sequence[index]);
            totalMarks += marks[markIndex];
        
        }

    }
    return  totalMarks ;
}


function checkDiffficultyLevel(level) {
    if (level == "Easy") return 0;
    else if (level == "Medium") return 1;
    else if (level == "Difficult") return 2;

}
module.exports = checkAns;