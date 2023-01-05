CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL
);

INSERT INTO songs (id, song_title, notes) 
VALUES 
(1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4'),
(2, 'Stairway to Heaven', 'A4 C4 E4 A5 B5 E4 C4 B4 C5 E4 C4 C5 F#4 D4 A4 D4 E4 C4 A4 C4 E4 C4 A4 G4 A4 A4'),
(3, 'Baby Got Back', 'C4 F4 C4 F4 C4 F4 C4 F4'),
(4, 'Iron Man', 'B3 B3 E3 E3 E3 G3 G3 G3 G3 D3 D3 E3 E3 E3 B3 B3 E3 E3 E3'),
(5, 'Smoke on the Water', 'A4 C4 E4 A5 B5 E4 C4 B4 C5 E4 C4 C5 F#4 D4 A4 D4 E4 C4 A4 C4 E4 C4 A4 G4 A4 A4');