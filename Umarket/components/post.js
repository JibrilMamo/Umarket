import React from 'react';

export default function Post(props) {
  const {
    edit,
    edittedValue,
    setEdittedValue,
    todoKey,
    handleDelete,
    todo,
    description,
    contact
  } = props;

  return (
    <div className="p-2 relative sm:p-3 flex items-stretch border border-solid border-amber-400 ">
      <div className="flex-1 flex">
        {!(edit === todoKey) ? (
          <>
            <div
  className="stacked-container"
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  }}
>
  <h3
    className="text-lg font-semibold mb-2"
    style={{
      fontSize: "1.2rem",
      fontWeight: "600",
      marginBottom: "0.5rem",
    }}
  >
    {todo}
  </h3>
  <p
    className="mb-2"
    style={{
      marginBottom: "0.5rem",
    }}
  >
    Description: {description}
  </p>
  <p>Contact: {contact}</p>
</div>

          </>
        ) : (
          <>
            <input
              className="bg-inherit flex-1 text-white outline-none"
              value={edittedValue.todo}
              onChange={(e) => setEdittedValue({ ...edittedValue, todo: e.target.value })}
            />
            <textarea
              className="bg-inherit flex-1 text-white outline-none"
              value={edittedValue.description}
              onChange={(e) => setEdittedValue({ ...edittedValue, description: e.target.value })}
              rows={3}
            />
            <input
              className="bg-inherit flex-1 text-white outline-none"
              value={edittedValue.contact}
              onChange={(e) => setEdittedValue({ ...edittedValue, contact: e.target.value })}
            />
          </>
        )}
      </div>
      <div className="flex items-center">
        
        <i
          onClick={() => handleDelete(todoKey)}
          className="fa-solid fa-trash-can px-9 duration-300 hover:scale-125 cursor-pointer gap-3"
        ></i>
      </div>
    </div>
  );
  
}
