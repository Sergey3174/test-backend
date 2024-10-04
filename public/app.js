document.addEventListener("click", (event) => {
  const id = event.target.dataset.id;

  if (event.target.dataset.type === "remove") {
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  } else if (event.target.dataset.type === "edit") {
    const newTitle = prompt(
      "Введите новый заголовок",
      event.target.closest("li").childNodes[0].textContent.trim()
    );
    if (newTitle) {
      edit(newTitle, id).then(() => {
        event.target.closest("li").childNodes[0].textContent = newTitle;
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(newTitle, id) {
  console.log(newTitle);
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // Убедитесь, что это правильно
    },
    body: JSON.stringify({ title: newTitle }),
  });
}
