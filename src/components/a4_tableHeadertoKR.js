export default function tableHeadertoKR(header) {
  if (header === 'name') return '이름';
  else if (header === 'email') return '이메일';
  else if (header === 'department') return '부서';
  else if (header === 'position') return '직급';
  else if (header === 'tel') return '전화번호';
  else if (header === 'createdAt') return '생성일자';
  else if (header === 'updatedAt') return '수정일자';
  else if (header === 'employeeId') return '사원번호';
}
