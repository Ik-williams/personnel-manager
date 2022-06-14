const KEYS = {
    personnels: 'personnels',
    personnelId: 'personnelId'
}

export const getDepartmentCollection = () => ([
    { id: '1', title: 'Development' },
    { id: '2', title: 'Marketing' },
    { id: '3', title: 'Accounting' },
    { id: '4', title: 'HR' },
])

export function insertPersonnel(data) {
    let personnels = getAllPersonnels();
    data['id'] = generatePersonnelId()
    personnels.push(data)
    localStorage.setItem(KEYS.personnels, JSON.stringify(personnels))
}

export function updatePersonnel(data) {
    let personnels = getAllPersonnels();
    let recordIndex = personnels.findIndex(x => x.id === data.id);
    personnels[recordIndex] = { ...data }
    localStorage.setItem(KEYS.personnels, JSON.stringify(personnels));
}

export function deletePersonnel(id) {
    let personnels = getAllPersonnels();
    personnels = personnels.filter(x => x.id !== id)
    localStorage.setItem(KEYS.personnels, JSON.stringify(personnels));
}

export function generatePersonnelId() {
    if (localStorage.getItem(KEYS.personnelId) === null)
        localStorage.setItem(KEYS.personnelId, '0')
    var id = parseInt(localStorage.getItem(KEYS.personnelId))
    localStorage.setItem(KEYS.personnelId, (++id).toString())
    return id;
}

export function getAllPersonnels() {
    if (localStorage.getItem(KEYS.personnels) === null)
        localStorage.setItem(KEYS.personnels, JSON.stringify([]))
    let personnels = JSON.parse(localStorage.getItem(KEYS.personnels));
    //map departmentID to department title
    let departments = getDepartmentCollection();
    return personnels.map(x => ({
        ...x,
        department: departments[x.departmentId - 1].title
    }))
}