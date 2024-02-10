import app from "@/firebase";
import { getFirestore, collection, onSnapshot, orderBy, query } from "firebase/firestore";

const db = getFirestore(app);

const makeDeviceEntity = ({ name, score }) => ({
  name,
  score,
});

const makeAssignmentEntity = ({ order, name, level, score, devices }) => ({
  order,
  name,
  level,
  score,
  devices: devices?.map((x) =>
    makeDeviceEntity({
      name: x.name,
      score: x.score,
    })
  ),
});

const makeUserScoreEntity = ({ username, totalScore, assignments }) => ({
  username,
  totalScore,
  assignments: assignments?.map((x, index) =>
    makeAssignmentEntity({
      order: index + 1,
      name: x.name,
      level: x.level,
      score: x.score,
      devices: x.devices,
    })
  ),
});

function mapDocsToUserScoreEntities(docs) {
  return docs?.map((doc) => {
    const data = doc.data();

    return makeUserScoreEntity({
      username: data.username,
      totalScore: data.totalScore,
      assignments: data.assignments,
    });
  });
}

export default function observeUserScore(onData) {
  const userScoreRef = collection(db, "user_score")
  const mQuery = query(userScoreRef, orderBy("totalScore", "desc"), orderBy("timestamp"));
  return onSnapshot((mQuery), {
    next: (snapshot) => {
      const entities = mapDocsToUserScoreEntities(snapshot.docs);
      if (onData) onData(entities);
    },
    error: (e) => {
      console.error(e)
    },
    complete: () => {
      console.log("complete fetching")
    },
  });
}