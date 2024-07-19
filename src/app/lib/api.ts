 import Database from 'better-sqlite3'

const db = new Database("courses.db");

export interface ICourse{
    id:number,
    price:number,
    duration:number,
    name:string,
    cover:string
}

export type InputCourse = Omit<ICourse, 'id'>

export interface UpdateCourse {
    id:number,
    price:number,
    duration:number,
    name:string,
    cover:string,
    isEmpty:boolean
}

export const getAllCourses = ():ICourse[]=> {
    return db.prepare("SELECT * FROM courses").all() as ICourse[];
}

export const getCourseById = (id:string|number):ICourse|null => {
    const statement = db.prepare("SELECT * FROM courses WHERE id=?");
    const info = statement.all(id);
    
    if(info.length === 0) {
        return null;
    }

    return info[0] as ICourse;
}

export const addCourse = (course:InputCourse) => {
    db.prepare(`
        INSERT INTO courses(name, price, duration, cover)
        VALUES(@name, @price, @duration, @cover)
        `).run(course)
}

export const updateCourse = (course:UpdateCourse) => {
    if(course.isEmpty) {
        db.prepare(`
            UPDATE courses
            SET name = @name, price = @price, duration = @duration
            WHERE id = @id
            `).run(course)    
    } else {
        db.prepare(`
            UPDATE courses
            SET name = @name, price = @price, duration = @duration, cover = @cover
            WHERE id = @id
            `).run(course)
    }
    
}
