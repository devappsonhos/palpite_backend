// dream.test.js
const apiUrl = (endpoint) => `http://localhost:3000/api/v1/${endpoint}`;
const { sharedData } = require("./shared");

test("Criar novo sonho", async () => {
    const newDreamData = {
        dream: "Meu novo sonho",
        terms: "Termos relacionados ao meu sonho",
        numberId: sharedData.numberId
    };

    const response = await fetch(apiUrl('dream'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sharedData.access_token}`,
        },
        body: JSON.stringify(newDreamData),
    });

    const createdDream = await response.json();
    expect(response.status).toBe(201);
    expect(createdDream).toHaveProperty('id');
});

test("Buscar sonho pelo ID", async () => {
    const dreamId = sharedData.dreamId;

    const response = await fetch(apiUrl(`dream/${dreamId}`), {
        headers: {
            'Authorization': `Bearer ${sharedData.access_token}`,
        },
    });

    const dream = await response.json();

    expect(response.status).toBe(200);
    expect(dream).toHaveProperty('id');
    expect(dream.id).toBe(dreamId);
});

test("Buscar todos os sonhos", async () => {
    const response = await fetch(apiUrl('dreams'), {
        headers: {
            'Authorization': `Bearer ${sharedData.access_token}`,
        },
    });

    const dreams = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(dreams)).toBe(true);
});

test("Atualizar sonho existente", async () => {
    const dreamId = sharedData.dreamId;
    const updatedDreamData = {
        dream: "Meu sonho atualizado",
        terms: "Novos termos relacionados ao meu sonho"
    };

    const response = await fetch(apiUrl(`dream/${dreamId}`), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sharedData.access_token}`,
        },
        body: JSON.stringify(updatedDreamData),
    });

    const updatedDream = await response.json();
    expect(response.status).toBe(200);
    expect(updatedDream).toHaveProperty('id');
    expect(updatedDream.id).toBe(dreamId);
    expect(updatedDream.dream).toBe(updatedDreamData.dream);
});

test("Excluir sonho", async () => {
    const dreamId = sharedData.dreamId;

    const response = await fetch(apiUrl(`dream/${dreamId}`), {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${sharedData.access_token}`,
        },
    });

    expect(response.status).toBe(200);
    const result = await response.json();
    expect(result).toEqual({ message: 'Sonho excluído com sucesso.' });
});
