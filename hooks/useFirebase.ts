import { firestore } from "@/firebase/firestore";
import { User } from "@/types";

const useFirebase = () => {
  const registerUser = async (userData: User) => {
    const { empty } = await firestore
      .collection("users")
      .where("email", "==", userData.email)
      .get();
    if (empty) {
      firestore.collection("users").doc().set(userData);
    }
  };

  const getCluster = async (id: string) => {
    return firestore
      .collection(id)
      .get()
      .then((snapshot) =>
        snapshot.docs.map((doc) => {
          return { ...doc.data(), key: doc.id };
        })
      );
  };

  const getUserData = async (email: string) => {
    return (await firestore.collection("users").doc(email).get()).data();
  };

  const setMockData = () => {
    return firestore
      .collection("users")
      .doc("test")
      .set({ clusters: mockData });
  };

  return { registerUser, getUserData, setMockData };
};

export default useFirebase;

const mockData = [
  {
    clusterId: "1fev4o1",
    title: "cluster1",
    color: "#64a8ff",
    pinned: false,
    createdAt: "2023-08-28 01:33:23",
    tasks: [
      {
        clusterId: "1fev4o1",
        taskId: "1172ii0",
        content: "task1",
        completed: false,
        createdAt: "2023-08-28 01:33:28",
      },
      {
        clusterId: "1fev4o1",
        taskId: "1d967xn",
        content: "task2",
        completed: false,
        createdAt: "2023-08-28 01:33:30",
      },
    ],
  },
  {
    clusterId: "53a2rd",
    title: "cluster2",
    color: "#64a8ff",
    pinned: false,
    createdAt: "2023-08-28 01:35:20",
    tasks: [],
  },
];
