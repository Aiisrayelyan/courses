import styles from "../page.module.css";
import { getAllCourses, ICourse } from "../lib/api";

export default function Home() {
    const result = getAllCourses();
    console.log(result);
  
    return <>
        <div className={styles.courses_div}>
            {result
                .filter((course) => course.name !== '')
                .map((course) => (
                    <div className={styles.courses_card} key={course.id}>
                        <h2>{course.name}</h2>
                        <h3>{'PRICE: ' + course.price}</h3>
                        <h3>{'DURATION: ' + course.duration}</h3>
                        <img src={'/' + course.cover}></img>
                    </div>
                ))}
        </div>
    </>
}
