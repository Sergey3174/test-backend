document.addEventListener("click", (event) => {
  const id = event.target.dataset.id;

  if (event.target.dataset.type === "remove") {
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  } else if (
    event.target.dataset.type === "edit" ||
    event.target.dataset.type === "cancel"
  ) {
    event.preventDefault();
    toggleStyle(event);
  } else if (event.target.dataset.type === "save") {
    event.preventDefault();
    const newTitle = event.target.closest("form").children[0].value;
    edit(newTitle, id).then(() => {
      event.target.closest("li").children[0].childNodes[0].textContent =
        newTitle;
      toggleStyle(event);
    });
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

function toggleStyle(event) {
  const li = event.target.closest("li");
  const div = li.querySelector("div");
  const form = li.querySelector("form");

  div.classList.toggle("d-none");
  form.classList.toggle("d-none");
}
