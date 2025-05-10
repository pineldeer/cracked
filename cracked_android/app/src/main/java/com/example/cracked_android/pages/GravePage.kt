package com.example.cracked_android.pages

import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import com.example.cracked_android.R

@Composable
fun GravePage(onGraveClick: () -> Unit) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .clickable(onClick = onGraveClick), // 전체 화면 클릭 가능
        contentAlignment = Alignment.Center
    ) {
        GraveImage() // 중앙에 무덤 이미지 표시
    }
}



@Composable
fun GraveImage() {
    Image(
        painter = painterResource(id = R.drawable.grave), // 파일 이름은 소문자 + 언더스코어만 허용
        contentDescription = "로컬 이미지",
        modifier = Modifier,
        contentScale = ContentScale.Crop
    )
}