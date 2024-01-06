import app from "@/firebase";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

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
  assignments: assignments?.map((x) =>
    makeAssignmentEntity({
      order: x.order,
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
  const query = collection(db, "user_score");
  return onSnapshot(query, {
    next: (snapshot) => {
      const entities = mapDocsToUserScoreEntities(snapshot.docs);
      if (onData) onData(entities);
    },
    error: (_) => {},
    complete: () => {},
  });
}