export const getChats = () =>
  Promise.resolve([
    { id: "1", name: "Mr. A" },
    { id: "2", name: "Mr. B" },
  ]);

export const getMessages = () =>
  Promise.resolve([
    { id: "m1", time: new Date().toLocaleTimeString(), text: "Hello there" },
    { id: "m2", time: new Date().toLocaleTimeString(), text: "Hi!" },
  ]);
