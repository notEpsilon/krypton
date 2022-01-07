import { Request, Response } from 'express';
import { ProfessorInfo } from '../models/Professor.model';
import { firestore } from '../firebase/firebase.util';
import Professor from '../models/Professor.model';
import {
    collection,
    getDocs,
    doc,
    getDoc,
    CollectionReference,
    setDoc,
    updateDoc,
    deleteDoc,
    DocumentReference
} from 'firebase/firestore';


const getAllProfessors = async (req: Request, res: Response) => {
    try {
        const colRef = collection(firestore, 'professors') as CollectionReference<ProfessorInfo>;

        const snapshot = await getDocs(colRef);

        const professors: Array<ProfessorInfo> = [];
        snapshot.forEach(professor => professors.push(professor.data()));

        res.status(200).send(professors);
    }
    catch (err) {
        res.status(500).send(`Error Retrieving All Professors, error: ${err}`);
    }
};

const getSingleProfessor = async (req: Request, res: Response) => {
    const { email } = req.params;

    try {
        const professorDoc = await getDoc(doc(firestore, 'professors', email));

        if (!professorDoc.exists())
            return res.status(404).send("Professor Not Found.");

        res.status(200).send(professorDoc.data());
    }
    catch (err) {
        res.status(500).send(`Error Retrieving The Professor, error: ${err}`);
    }
};

const addProfessor = async (req: Request, res: Response) => {
    const professorInfo = new Professor({ ...req.body }).info();

    try {
        const docRef = doc(firestore, 'professors', professorInfo.email) as DocumentReference<ProfessorInfo>;

        await setDoc<ProfessorInfo>(docRef, professorInfo);

        res.status(200).send("Professors Added to Database Successfully.");
    }
    catch (err) {
        res.status(500).send(`Error Adding a New Professor to The Database, error: ${err}`);
    }
};

const updateProfessor = async (req: Request, res: Response) => {
    const updatedProfessor = new Professor({ ...req.body }).info();
    const { email } = req.params;

    try {
        const docRef = doc(firestore, 'professors', email) as DocumentReference<ProfessorInfo>;
        const docSnapshot = await getDoc<ProfessorInfo>(docRef);

        if (!docSnapshot.exists()) {
            return res.status(404).send("Professor Not Found.");
        }

        if (email !== updatedProfessor.email) {
            return res.status(400).send("You Can't Update Your Email Address.");
        }

        await updateDoc<ProfessorInfo>(docRef, updatedProfessor);

        res.status(200).send("Updated Professor Successfully.");
    }
    catch (err) {
        res.status(500).send(`Error Updating The Professor, error: ${err}`);
    }
};

const deleteProfessor = async (req: Request, res: Response) => {
    const { email } = req.params;

    try {
        const docRef = doc(firestore, 'professor', email) as DocumentReference<ProfessorInfo>;
        const docSnapshot = await getDoc<ProfessorInfo>(docRef);

        if (!docSnapshot.exists()) {
            return res.status(404).send("Professor Already Doesn't Exist.");
        }

        await deleteDoc(docRef);

        res.status(200).send("Professor Deleted Successfully.");
    }
    catch (err) {
        res.status(500).send(`Error Deleting The Professor, error: ${err}`);
    }
};

const professorController = {
    getAllProfessors,
    getSingleProfessor,
    addProfessor,
    updateProfessor,
    deleteProfessor
};

export default professorController;
