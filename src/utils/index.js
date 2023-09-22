export const calculation = (percentage, grade) => {
  if (percentage >= 80) {
    return grade ? "A+" : 4.0;
  } else if (percentage <= 75 && percentage < 80) {
    return grade ? "A" : 3.75;
  } else if (percentage <= 70 && percentage < 75) {
    return grade ? "A-" : 3.5;
  } else if (percentage <= 65 && percentage < 70) {
    return grade ? "B+" : 3.25;
  } else if (percentage <= 60 && percentage < 65) {
    return grade ? "B" : 3.0;
  } else if (percentage <= 55 && percentage < 60) {
    return grade ? "B-" : 2.75;
  } else if (percentage <= 50 && percentage < 55) {
    return grade ? "C+" : 2.5;
  } else if (percentage <= 45 && percentage < 50) {
    return grade ? "C" : 2.25;
  } else if (percentage <= 40 && percentage < 45) {
    return grade ? "D" : 2.0;
  } else {
    return grade ? "F" : 0.0;
  }
};

export const pointsToGrade = (cgpa) => {
  if (cgpa >= 3.67 && cgpa <= 4.0) {
    return "A+";
  } else if (cgpa >= 3.33 && cgpa < 3.67) {
    return "A";
  } else if (cgpa >= 3.0 && cgpa < 3.33) {
    return "A-";
  } else if (cgpa >= 2.67 && cgpa < 3.0) {
    return "B+";
  } else if (cgpa >= 2.33 && cgpa < 2.67) {
    return "B";
  } else if (cgpa >= 2.0 && cgpa < 2.33) {
    return "B-";
  } else if (cgpa >= 1.67 && cgpa < 2.0) {
    return "C+";
  } else if (cgpa >= 1.33 && cgpa < 1.67) {
    return "C";
  } else if (cgpa >= 1.0 && cgpa < 1.33) {
    return "D";
  } else {
    return "F"; // Fail
  }
};
