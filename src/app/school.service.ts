import { Injectable } from '@angular/core';
import { Subject } from './subject-list/subject/Subject';
import { Teacher } from './teacher/Teacher';
import { GroupList } from './subject-list/subject/group-list/GroupList';
import { ClassInformation } from './subject-list/subject/group-list/ClassInformation';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  public subjects: Subject[] = [];
  public teachers: Teacher[] = [];
  public groups: GroupList[] = [];

  constructor() {

    let requestURL = 'https://api.myjson.com/bins/1h7z7k';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    // request.responseType = 'json';
    request.send();
    let self = this;
    request.onload = () => {
      let jsonFile = request.response;
      let subjects = JSON.parse(jsonFile);

      for (let subject of subjects) {
        self.addSubject(subject.name, subject.description, subject.credits, subject.area, subject.department, subject.groups);
        for (let group of subject.groups) {
          self.addGroup(group.name, group.teacher, group.classInfo);
        }
      }

      for (let group of self.groups) {
        self.addTeacher(group.teacher.name, group.teacher.lastname);
      }

      self.addTeacher("Hugo", "Piza");
      self.modifyTeacherByName("Hugo", "Piza", "Luis", "Gatica");
      self.deleteTeacherByName("Luis", "Gatica");
      console.log(self.teachers);
    };
  }

  addSubject(name: string, description: string, credits: number, area: string, department: string, groups: GroupList[]) {
    let id = 0;
    if (this.subjects.length > 0) id = this.subjects[this.subjects.length-1].id + 1;

    let newSubject = new Subject(id, name, description, credits, area, department, groups);
    this.subjects.push(newSubject);
  }

  modifySubjectById(id: number, name: string, description: string, credits: number, area: string, department: string, groups: GroupList[]) {
    let subjectIndex = this.subjects.findIndex(sub => sub.id == id);

    if (subjectIndex != -1) {
      if (name != null) this.subjects[subjectIndex].name = name;
      if (description != null) this.subjects[subjectIndex].description = description;
      if (credits != null) this.subjects[subjectIndex].credits = credits;
      if (area != null) this.subjects[subjectIndex].area = area;
      if (department != null) this.subjects[subjectIndex].department = department;
      if (groups != null) this.subjects[subjectIndex].groups = groups;
    }
  }

  modifySubjectByName(nameToSearch: string, newName: string, description: string, credits: number, area: string, department: string, groups: GroupList[]) {
    let subjectIndex = this.subjects.findIndex(sub => sub.name == nameToSearch);

    if (subjectIndex != -1) {
      if (newName != null) this.subjects[subjectIndex].name = name;
      if (description != null) this.subjects[subjectIndex].description = description;
      if (credits != null) this.subjects[subjectIndex].credits = credits;
      if (area != null) this.subjects[subjectIndex].area = area;
      if (department != null) this.subjects[subjectIndex].department = department;
      if (groups != null) this.subjects[subjectIndex].groups = groups;
    }
  }

  deleteSubjectById(id: number) {
    let subjectIndex = this.subjects.findIndex(sub => sub.id == id);

    if (subjectIndex != -1) {
      this.subjects.splice(subjectIndex, 1);
    }
  }

  deleteSubjectByName(name: string) {
    let subjectIndex = this.subjects.findIndex(sub => sub.name == name);
    console.log(subjectIndex);
    if (subjectIndex != -1) {
      this.subjects.splice(subjectIndex, 1);
    }
  }

  addGroup(name: string, teacher: Teacher, classInfo: ClassInformation[]) {
    let id = 0;
    if (this.groups.length > 0) id = this.groups[this.groups.length-1].id + 1;

    let newGroup = new GroupList(id, name, teacher, classInfo);
    this.groups.push(newGroup);
  }

  modifyGroupById(id: number, name: string, teacher: Teacher, classInfo: ClassInformation[]) {
    let groupIndex = this.groups.findIndex(group => group.id == id);

    if(groupIndex != -1) {
      if(name != null) this.groups[groupIndex].name = name;
      if(teacher != null) this.groups[groupIndex].teacher = teacher;
      if(classInfo != null) this.groups[groupIndex].classInfo = classInfo;
    }
  }

  modifyGroupByName(nameToSearch: string, name: string, teacher: Teacher, classInfo: ClassInformation[]) {
    let groupIndex = this.groups.findIndex(group => group.name == nameToSearch);

    if(groupIndex != -1) {
      if(name != null) this.groups[groupIndex].name = name;
      if(teacher != null) this.groups[groupIndex].teacher = teacher;
      if(classInfo != null) this.groups[groupIndex].classInfo = classInfo;
    }
  }

  deleteGroupById(id: number) {
    let groupIndex = this.groups.findIndex(group => group.id == id);

    if (groupIndex != -1) {
      this.groups.splice(groupIndex, 1);
    }
  }

  deleteGroupByName(name: string) {
    let groupIndex = this.groups.findIndex(group => group.name == name);
    
    if (groupIndex != -1) {

      this.groups.splice(groupIndex, 1);
    }
  }

  addTeacher(name: string, lastName: string) {
    let id = 0;
    if(this.teachers.length > 0) id = this.teachers[this.teachers.length-1].id + 1;

    let teacher = new Teacher(id, name, lastName);
    this.teachers.push(teacher);
  }

  modifyTeacherById(id: number, name: string, lastName: string) {
    let teacherIndex = this.teachers.findIndex(teacher => teacher.id == id);

    if(teacherIndex != -1){
      if(name != null) this.teachers[teacherIndex].name = name;
      if(lastName != null) this.teachers[teacherIndex].lastname = lastName;
    }
  }

  modifyTeacherByName(nameToSearch: string, lastNameToSearch: string, name: string, lastName: string) {
    let teacherIndex = this.teachers.findIndex(teacher => teacher.name == nameToSearch && teacher.lastname == lastNameToSearch);

    if(teacherIndex != -1){
      if(name != null) this.teachers[teacherIndex].name = name;
      if(lastName != null) this.teachers[teacherIndex].lastname = lastName;
    }
  }

  deleteTeacherById(id: number) {
    let teacherIndex = this.teachers.findIndex(teacher => teacher.id == id);

    if(teacherIndex != -1) {
      this.teachers.splice(teacherIndex, 1);
    }
  }

  deleteTeacherByName(name: string, lastName: string) {
    let teacherIndex = this.teachers.findIndex(teacher => teacher.name == name && teacher.lastname == lastName);

    if(teacherIndex != -1) {
      this.teachers.splice(teacherIndex, 1);
    }
  }
}
