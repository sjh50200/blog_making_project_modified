
export function countComment(page, comments) {
    let count = 0;
    comments.forEach(v => {
        if(v.page === page)
            count++;
    })
    return count;
}