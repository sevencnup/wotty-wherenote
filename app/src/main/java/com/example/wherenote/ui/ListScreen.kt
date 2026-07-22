package com.example.wherenote.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.wherenote.data.Note
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ListScreen(
    vm: NoteViewModel,
    onEdit: (Note) -> Unit
) {
    val query by vm.query.collectAsState()
    val notes by vm.notes.collectAsState()

    Scaffold(
        topBar = {
            TopAppBar(title = { Text("东西在哪") })
        }
    ) { pad ->
        Column(Modifier.fillMaxSize().padding(pad)) {
            OutlinedTextField(
                value = query,
                onValueChange = vm::setQuery,
                modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp),
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                placeholder = { Text("搜索物品 / 位置 / 备注") },
                singleLine = true
            )
            if (notes.isEmpty()) {
                Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                    Text("还没有记录,去「记住」页记一条吧", color = MaterialTheme.colorScheme.outline)
                }
            } else {
                LazyColumn(
                    contentPadding = PaddingValues(16.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    items(notes, key = { it.id }) { note ->
                        NoteCard(note, onClick = { onEdit(note) }, onDelete = { vm.delete(note) })
                    }
                }
            }
        }
    }
}

@Composable
private fun NoteCard(note: Note, onClick: () -> Unit, onDelete: () -> Unit) {
    Card(
        onClick = onClick,
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
            note.photoPath?.let {
                PhotoThumb(path = it, sizeDp = 64.dp)
                androidx.compose.foundation.layout.Spacer(Modifier.padding(horizontal = 6.dp))
            }
            Column(Modifier.weight(1f)) {
                Text(note.title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                Text("📍 ${note.location}", style = MaterialTheme.typography.bodyMedium, modifier = Modifier.padding(top = 4.dp))
                if (note.remark.isNotBlank()) {
                    Text(note.remark, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.outline, modifier = Modifier.padding(top = 4.dp))
                }
                Text(formatTime(note.createdAt), style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.outline, modifier = Modifier.padding(top = 8.dp))
            }
        }
    }
}

private fun formatTime(ts: Long): String =
    SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.getDefault()).format(Date(ts))

@Preview(showBackground = true)
@Composable
private fun ListScreenPreview() {
    WhereNoteTheme {
        Text("随记列表预览", modifier = Modifier.padding(24.dp))
    }
}