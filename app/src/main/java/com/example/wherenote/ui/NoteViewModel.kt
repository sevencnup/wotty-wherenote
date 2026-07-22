package com.example.wherenote.ui

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.wherenote.data.AppDatabase
import com.example.wherenote.data.Note
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class NoteViewModel(app: Application) : AndroidViewModel(app) {
    private val dao = AppDatabase.get(app).noteDao()

    private val _query = MutableStateFlow("")
    val query: StateFlow<String> = _query.asStateFlow()

    @OptIn(ExperimentalCoroutinesApi::class)
    val notes: StateFlow<List<Note>> = _query
        .flatMapLatest { key -> if (key.isBlank()) dao.observeAll() else dao.search(key.trim()) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    fun setQuery(q: String) { _query.value = q }

    fun add(title: String, location: String, remark: String, photoPath: String?) {
        if (title.isBlank()) return
        viewModelScope.launch {
            dao.insert(Note(
                title = title.trim(),
                location = location.trim(),
                remark = remark.trim(),
                photoPath = photoPath
            ))
        }
    }

    fun update(note: Note) {
        viewModelScope.launch { dao.update(note) }
    }

    fun delete(note: Note) {
        viewModelScope.launch { dao.delete(note) }
        note.photoPath?.let { runCatching { java.io.File(it).delete() } }
    }
}