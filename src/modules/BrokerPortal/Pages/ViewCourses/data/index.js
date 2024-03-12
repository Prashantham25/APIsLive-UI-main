import LifeInsuranceCourse from "../../../../../assets/images/BrokerPortal/LifeInsuranceCourse.png";
import GeneralInsuranceCourse from "../../../../../assets/images/BrokerPortal/GeneralInsuranceCourse.png";
import InhouseCourse from "../../../../../assets/images/BrokerPortal/InhouseCourse.png";

function CoursesData() {
  return {
    CourseArray: [
      {
        img: <img scr={LifeInsuranceCourse} alt="" />,
        CourseName: "Agent certification Life insurance Module",
        CourseDuration: "15hrs",
        NoOfHrsFinished: "0:00",
        Deadline: "06th May, 2022",
      },
      {
        img: <img scr={GeneralInsuranceCourse} alt="" />,
        CourseName: "Agent certification General insurance Module",
        CourseDuration: "15hrs",
        NoOfHrsFinished: "0:00",
        Deadline: "06th May, 2022",
      },
      {
        img: <img scr={InhouseCourse} alt="" />,
        CourseName: "Inhouse Training Course name",
        CourseDuration: "15hrs",
        NoOfHrsFinished: "0:00",
        Deadline: "06th May, 2022",
      },
    ],
  };
}

export default CoursesData;
