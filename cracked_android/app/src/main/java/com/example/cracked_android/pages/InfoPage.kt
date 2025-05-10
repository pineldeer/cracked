package com.example.cracked_android.pages

import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.KeyboardArrowLeft
import androidx.compose.material.icons.filled.KeyboardArrowRight
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.rememberImagePainter

@Composable
fun InfoPage(
    onNextClick: () -> Unit,
    // 뷰모델은 추후 삽입
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        PhotoPicker()
        Spacer(modifier = Modifier.height(24.dp))
        NameInput()
        Spacer(modifier = Modifier.height(24.dp))
        GenderSelector()
        Spacer(modifier = Modifier.height(24.dp))
        AgePicker()
        Spacer(modifier = Modifier.height(32.dp))
        NextButton(onClick = onNextClick)
    }
}

@Composable
fun PhotoPicker() {
    val imageUri = remember { mutableStateOf<Uri?>(null) }
    val launcher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent()
    ) { uri: Uri? ->
        imageUri.value = uri
    }

    Box(
        modifier = Modifier
            .size(120.dp)
            .clip(RoundedCornerShape(8.dp))
            .background(Color.Gray.copy(alpha = 0.2f))
            .clickable { launcher.launch("image/*") },
        contentAlignment = Alignment.Center
    ) {
        if (imageUri.value != null) {
            Image(
                painter = rememberImagePainter(imageUri.value),
                contentDescription = null,
                modifier = Modifier.fillMaxSize(),
                contentScale = ContentScale.Crop
            )
        } else {
            Icon(
                imageVector = Icons.Default.Add,
                contentDescription = "Add Photo",
                modifier = Modifier.size(48.dp),
                tint = Color.DarkGray
            )
        }
    }
}

@Composable
fun NameInput() {
    var name by remember { mutableStateOf("") }

    OutlinedTextField(
        value = name,
        onValueChange = { name = it },
        label = { Text("당신의 이름을 알려주세요") },
        singleLine = true,
        modifier = Modifier.fillMaxWidth(0.9f)
    )
}

@Composable
fun GenderSelector() {
    var selectedGender by remember { mutableStateOf<String?>(null) }

    Row(
        horizontalArrangement = Arrangement.spacedBy(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        GenderOption("남", selectedGender) { selectedGender = it }
        GenderOption("여", selectedGender) { selectedGender = it }
    }
}

@Composable
fun GenderOption(label: String, selected: String?, onSelect: (String) -> Unit) {
    val isSelected = selected == label
    OutlinedButton(
        onClick = { onSelect(label) },
        colors = ButtonDefaults.outlinedButtonColors(
            containerColor = if (isSelected) Color.LightGray else Color.Transparent
        )
    ) {
        Text(label)
    }
}

@Composable
fun AgePicker() {
    var age by remember { mutableStateOf(20) } // default 20세

    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text("당신은 몇 살인가요?", style = MaterialTheme.typography.bodyLarge)
        Spacer(modifier = Modifier.height(8.dp))
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconButton(onClick = { if (age > 0) age-- }) {
                Icon(Icons.Default.KeyboardArrowLeft, contentDescription = "나이 감소")
            }
            Text("$age 세", fontSize = 20.sp)
            IconButton(onClick = { if (age < 120) age++ }) {
                Icon(Icons.Default.KeyboardArrowRight, contentDescription = "나이 증가")
            }
        }
    }
}

@Composable
fun NextButton(onClick: () -> Unit) {
    Button(
        onClick = onClick,
        modifier = Modifier
            .fillMaxWidth(0.9f)
            .height(56.dp),
        shape = RoundedCornerShape(12.dp)
    ) {
        Text("나의 마지막 문장을 찾아서")
    }
}
